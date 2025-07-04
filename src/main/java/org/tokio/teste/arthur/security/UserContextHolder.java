package org.tokio.teste.arthur.security;

import org.tokio.teste.arthur.domain.dto.UserDTO;

public class UserContextHolder {

    private static final ThreadLocal<UserDTO> userThreadLocal = new ThreadLocal<>();

    public static void setUser(UserDTO user) {
        userThreadLocal.set(user);
    }

    public static UserDTO getUser() {
        return userThreadLocal.get();
    }

    public static void clear() {
        userThreadLocal.remove();
    }
}
