package org.tokio.teste.arthur.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.Getter;
import org.springframework.stereotype.Component;
import org.tokio.teste.arthur.domain.dto.UserDTO;
import org.tokio.teste.arthur.utils.Utils;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtTokenProvider {

    private final SecretKey key;

    public static final String accessTokenName = "access_token";

    @Getter
    public static final long accessTokenValidity = Utils.minutes(15L);

    public JwtTokenProvider() {
        // Em produção, use uma chave vinda de configuração segura
        String secret = "minha-chave-secreta-muito-forte-e-com-mais-de-256-bits"; // deve ter no mínimo 32 bytes para
        // HS256
        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    public String generateAccessToken(UserDTO user, String ip, String userAgent) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + accessTokenValidity);

        return Jwts.builder().subject(user.getNickname())
                .claim("id", user.getId())
                .claim("ip", ip)
                .claim("ua", userAgent)
                .claim("name", user.getName())
                .issuedAt(now)
                .expiration(expiryDate)
                .signWith(key, Jwts.SIG.HS256)
                .compact();
    }

    @SuppressWarnings("unused")
    public String getUserNameFromJWT(String token) {
        JwtParser parser = Jwts.parser().verifyWith(key).build();
        return parser.parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    @SuppressWarnings("unused")
    public Long getUserIdFromJWT(String token) {
        JwtParser parser = Jwts.parser().verifyWith(key).build();

        return parser
                .parseSignedClaims(token)
                .getPayload()
                .get("id", Long.class);
    }

    public UserDTO getUserFromJWT(String token) {
        JwtParser parser = Jwts.parser().verifyWith(key).build();
        UserDTO user = new UserDTO();

        user.setId(parser.parseSignedClaims(token).getPayload().get("id", Long.class));
        user.setNickname(parser.parseSignedClaims(token).getPayload().getSubject());
        user.setName(parser.parseSignedClaims(token).getPayload().get("name", String.class));

        return user;
    }

    public boolean validateToken(String token, String currentIp, String currentUserAgent) {
        try {
            Jws<Claims> claims = Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(token);

            Claims body = claims.getPayload();

            // Comparação com os dados do request atual
            String tokenIp = body.get("ip", String.class);
            String tokenUa = body.get("ua", String.class);

            return !isTokenExpired(token) &&
                    tokenIp.equals(currentIp) &&
                    tokenUa.equals(currentUserAgent);

        } catch (Exception e) {
            return false;
        }
    }

    public boolean isTokenExpired(String token) {
        try {
            Claims claims = Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();

            return claims.getExpiration().before(new Date());
        } catch (Exception e) {
            return true;
        }
    }

    public static Cookie createCookie(String token) {
        Cookie cookie = new Cookie(JwtTokenProvider.accessTokenName, token);
        cookie.setHttpOnly(true); // Prevents JavaScript access
        cookie.setSecure(true); // Requires HTTPS
        cookie.setPath("/"); // Available for all paths
        cookie.setMaxAge(Long.valueOf(JwtTokenProvider.accessTokenValidity).intValue());
        cookie.setAttribute("SameSite", "Strict"); // Prevents CSRF
        return cookie;
    }

    public static String extractTokenFromCookie(HttpServletRequest request) {
        if (request.getCookies() == null) return null;
        for (Cookie cookie : request.getCookies()) {
            if (JwtTokenProvider.accessTokenName.equals(cookie.getName())) {
                return cookie.getValue();
            }
        }
        return null;
    }

}
