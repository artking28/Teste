package org.tokio.teste.arthur.config;

import org.hibernate.dialect.PostgreSQLDialect;

public class MyPostgresDialect extends PostgreSQLDialect {

    @Override
    public String getCheckCondition(String columnName, String[] values) {
        return null;
    }
}
