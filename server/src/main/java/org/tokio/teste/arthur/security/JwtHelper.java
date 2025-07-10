package org.tokio.teste.arthur.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;

import java.nio.file.AccessDeniedException;
import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

public class JwtHelper {

    private static final Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    private static final int MINUTES = 60;

    public static String generateToken(String userUuid) {
        var now = Instant.now();
        return Jwts.builder()
                .subject(userUuid)
                .issuedAt(Date.from(now))
                .expiration(Date.from(now.plus(MINUTES, ChronoUnit.MINUTES)))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

    public static String extractUuid(String token) throws AccessDeniedException {
        return getTokenBody(token).getSubject();
    }

    public static Boolean validateToken(String token, CustomUserDetails userDetails) throws AccessDeniedException {
        final String uuid = extractUuid(token);
//        if (!ret) {
//            System.out.println("Entrou aqui");
//        }
        return uuid.equals(userDetails.getUuid()) && !isTokenExpired(token);
    }

    private static Claims getTokenBody(String token) throws AccessDeniedException {
        try {
            return Jwts.parser().setSigningKey(SECRET_KEY)
                    .build().parseSignedClaims(token)
                    .getPayload();
        } catch (SignatureException | ExpiredJwtException e) { // Invalid signature or expired token
            throw new AccessDeniedException("Access denied: " + e.getMessage());
        }
    }

    private static boolean isTokenExpired(String token) throws AccessDeniedException {
        Claims claims = getTokenBody(token);
        return claims.getExpiration().before(new Date());
    }
}
