package org.tokio.teste.arthur.utils;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

@Getter
@Setter
public class FilteredPageRequest<T> {
    private int page;
    private int size;
    private String sortBy;
    private String direction;
    private T content;

    public PageRequest toSpringPageRequest() {
        Sort sort = Sort.by(Sort.Direction.fromString(direction), sortBy);
        return PageRequest.of(page, size, sort);
    }
}
