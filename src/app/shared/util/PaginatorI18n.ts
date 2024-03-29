
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

export class PaginatorI18n {

    constructor(private readonly translate: TranslateService) {}

    getPaginatorIntl(): MatPaginatorIntl {
        const paginatorIntl = new MatPaginatorIntl();
        paginatorIntl.itemsPerPageLabel = "Itens por página:"
        paginatorIntl.nextPageLabel = this.translate.instant('table.NEXT_PAGE_LABEL');
        paginatorIntl.previousPageLabel = this.translate.instant('table.PREVIOUS_PAGE_LABEL');
        paginatorIntl.firstPageLabel = this.translate.instant('table.FIRST_PAGE_LABEL');
        paginatorIntl.lastPageLabel = this.translate.instant('table.LAST_PAGE_LABEL');
        paginatorIntl.getRangeLabel = this.getRangeLabel.bind(this);
        return paginatorIntl;
    }

    private getRangeLabel(page: number, pageSize: number, length: number): string {
        if (length === 0 || pageSize === 0) {
            return this.translate.instant('table.RANGE_PAGE_LABEL_1', { length });
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        // If the start index exceeds the list length, do not try and fix the end index to the end.
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return this.translate.instant('table.RANGE_PAGE_LABEL_2', { startIndex: startIndex + 1, endIndex, length });
    }
}
