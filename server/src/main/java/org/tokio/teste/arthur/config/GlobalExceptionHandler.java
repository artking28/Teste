package org.tokio.teste.arthur.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;
import org.tokio.teste.arthur.domain.exception.AccessDeniedRuleException;
import org.tokio.teste.arthur.domain.exception.DeleteRecordException;
import org.tokio.teste.arthur.domain.noData.GenericResponse;
import org.tokio.teste.arthur.domain.noData.JsonMessage;
import org.tokio.teste.arthur.utils.MessageContextHolder;

import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

import static org.tokio.teste.arthur.domain.enums.ResponseCodeEnum.TYPE_ERROR;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    private final MessageSource messageSource;

    public GlobalExceptionHandler(MessageSource messageSource) {
        this.messageSource = messageSource;
    }

    @ExceptionHandler(DeleteRecordException.class)
    public ResponseEntity<GenericResponse> handleDelete(DeleteRecordException e) {
        return buildResponse(HttpStatus.CONFLICT, e.getMessage(), e);
    }

    @ExceptionHandler({
            AccessDeniedRuleException.class,
            AccessDeniedException.class
    })
    public ResponseEntity<GenericResponse> handleAccessDenied(Exception e) {
        return buildResponse(HttpStatus.FORBIDDEN, "error.accessDenied", e);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<GenericResponse> handleIntegrity(DataIntegrityViolationException e) {
        return buildResponse(HttpStatus.CONFLICT, "error.integrityViolation", e);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<GenericResponse> handleValidation(MethodArgumentNotValidException e) {
        String msg = e.getBindingResult().getFieldErrors().stream()
                .map((err) -> err.getField() + ": " + resolveMessage(err.getDefaultMessage(), null))
                .collect(Collectors.joining("; "));
        return buildResponse(HttpStatus.BAD_REQUEST, msg, null);
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<GenericResponse> handleMethodNotAllowed(HttpRequestMethodNotSupportedException e) {
        return buildResponse(HttpStatus.METHOD_NOT_ALLOWED, "error.methodNotAllowed", e);
    }

    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<GenericResponse> handleNoResourceFoundException(Exception e) {
        return buildResponse(HttpStatus.NOT_FOUND, "error.resource.not.found", e);
    }

    @ExceptionHandler(DuplicateKeyException.class)
    public ResponseEntity<GenericResponse> handleDuplicateKeyException(Exception e) {
        return buildResponse(HttpStatus.CONFLICT, "error.user.already_exists", e);
    }

    @ExceptionHandler({
            InternalAuthenticationServiceException.class,
            BadCredentialsException.class
    })
    public ResponseEntity<GenericResponse> handleInternalAuthenticationServiceException(Exception e) {
        return buildResponse(HttpStatus.UNAUTHORIZED, "auth.bad_credentials", e);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<GenericResponse> handleGeneric(Exception e) {
        logger.error("Unknown error:", e);
        return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR, "error.internal", e);
    }

    private ResponseEntity<GenericResponse> buildResponse(HttpStatus status, String rawMessage, Object context) {
        GenericResponse response = new GenericResponse(false);
        response.addMessage(new JsonMessage(resolveMessage(rawMessage, null), TYPE_ERROR));
        addUserMessages(response, context);
        return ResponseEntity.status(status).body(response);
    }

    private void addUserMessages(GenericResponse response, Object entity) {
        try {
            List<JsonMessage> messages = MessageContextHolder.getMessages();
            if (messages != null) {
                messages.forEach((msg) -> {
                    response.addMessage(new JsonMessage(
                            resolveMessage(msg.message, msg.args != null ? msg.args.toArray() : null),
                            msg.type
                    ));
                });
                MessageContextHolder.clear();
            }
        } catch (Exception ex) {
            if (entity != null) {
                logger.error("Error processing user's messages: {}", entity.getClass().getSimpleName(), ex);
            } else {
                logger.error("Error processing user's messages", ex);
            }
        }
    }

    private String resolveMessage(String codeOrText, Object[] args) {
        try {
            return messageSource.getMessage(codeOrText, args, codeOrText, Locale.getDefault());
        } catch (Exception e) {
            return codeOrText;
        }
    }
}
