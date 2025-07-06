package org.tokio.teste.arthur.domain.enums;

import lombok.Getter;
import org.tokio.teste.arthur.domain.entity.User;
import org.tokio.teste.arthur.domain.exception.BusinessRuleException;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.tokio.teste.arthur.domain.enums.ResponseCodeEnum.TYPE_ERROR;

public enum ActionPermissionEnum {

    USER_READ(ActionEnum.READ, "user.read", User.class.getSimpleName()),
    USER_CREATE(ActionEnum.CREATE, "user.create", User.class.getSimpleName()),
    USER_UPDATE(ActionEnum.UPDATE, "user.update", User.class.getSimpleName()),
    USER_DELETE(ActionEnum.DELETE, "user.delete", User.class.getSimpleName()),

    ADDRESS_READ(ActionEnum.READ, "address.read", User.class.getSimpleName()),
    ADDRESS_CREATE(ActionEnum.CREATE, "address.create", User.class.getSimpleName()),
    ADDRESS_UPDATE(ActionEnum.UPDATE, "address.update", User.class.getSimpleName()),
    ADDRESS_DELETE(ActionEnum.DELETE, "address.delete", User.class.getSimpleName()),

    ;

    public final ActionEnum action;

    @Getter
    public final String key;

    public final String className;

    final List<String> addedPermissions = new ArrayList<>();

    ActionPermissionEnum(ActionEnum action, String key, String className) {
        this.action = action;
        this.key = key;
        this.className = className;
        addedPermissions.add(this.name());
    }

    public static ActionPermissionEnum getByActionKey(String actionKey) {
        var ret = Arrays.stream(values())
                .filter(actionPermissionEnum -> actionPermissionEnum.key.equals(actionKey))
                .findFirst();
        return ret.orElse(null);
    }

    public static ActionPermissionEnum getByAction(ActionEnum action, Class<?> clas) throws BusinessRuleException {
        var ret = Arrays.stream(values())
                .filter(actionPermissionEnum ->
                        actionPermissionEnum.action.equals(action) &&
                                actionPermissionEnum.className.equals(clas.getSimpleName()))
                .findFirst();
        return ret.orElseThrow(() -> new BusinessRuleException("error.actionPermission.notFound", TYPE_ERROR));
    }

    public static List<ActionPermissionEnum> getAdminRole() {
        return List.of(values()); // Admin tem todas as permissões
    }

    public static List<ActionPermissionEnum> getMemberRole() {
        return List.of(ADDRESS_READ, ADDRESS_CREATE, ADDRESS_UPDATE, ADDRESS_DELETE);
    }
}
