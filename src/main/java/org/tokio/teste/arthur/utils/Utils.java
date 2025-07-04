package org.tokio.teste.arthur.utils;

public class Utils {

    public static Long seconds(Long n) {
        return n*1000;
    }

    public static Long minutes(Long n) {
        return n*seconds(60L);
    }
}
