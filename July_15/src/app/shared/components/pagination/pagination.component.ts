import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';

@Component({
    selector: 'pagination',
    templateUrl: 'pagination.component.html',
    styleUrls: ['pagination.component.scss']
})
export class PaginationComponent implements OnChanges {
    @Output() changePage = new EventEmitter<any>(true);
    @Input() totalItems = 0;
    @Input() pageLimits: number[] = [5, 10, 20];
    @Input() pageSize = 10;

    initialPage = 1;
    maxPages = 10;

    //pageLimits: any[] = [5, 10, 20];

    pager?: Pager;
    constructor() {
        if (this.pageLimits == undefined || this.pageLimits.length == 0) {
            this.pageLimits = [5, 10, 20]
        }
    }
    ngOnChanges(changes: SimpleChanges) {
        let emitChanges: boolean = true;
        if (this.isEmptyObj(changes['totalItems']) === false
            && this.isEmpty(changes['totalItems']?.previousValue)) {
            emitChanges = false;
        }
        this.setPage(this.initialPage, emitChanges);
    }

    setPage(page: number, emitChanges: boolean = true) {
        if (this.totalItems <= 0) return;
        // get new pager object for specified page
        this.pager = this.paginate(this.totalItems, page, this.pageSize, this.maxPages);
        if (emitChanges) {
            // call change page function in parent component
            this.changePage.emit(this.pager);
        }
    }

    paginate(totalItems: number, currentPage: number = 1, pageSize: number = 10, maxPages: number = 10): Pager {
        // calculate total pages
        let totalPages = Math.ceil(totalItems / pageSize);

        // ensure current page isn't out of range
        if (currentPage < 1) {
            currentPage = 1;
        } else if (currentPage > totalPages) {
            currentPage = totalPages;
        }

        let startPage: number, endPage: number;
        if (totalPages <= maxPages) {
            // total pages less than max so show all pages
            startPage = 1;
            endPage = totalPages;
        } else {
            // total pages more than max so calculate start and end pages
            let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
            let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
            if (currentPage <= maxPagesBeforeCurrentPage) {
                // current page near the start
                startPage = 1;
                endPage = maxPages;
            } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
                // current page near the end
                startPage = totalPages - maxPages + 1;
                endPage = totalPages;
            } else {
                // current page somewhere in the middle
                startPage = currentPage - maxPagesBeforeCurrentPage;
                endPage = currentPage + maxPagesAfterCurrentPage;
            }
        }

        // calculate start and end item indexes
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

        // return object with all pager properties required by the view
        return {
            totalItems,
            currentPage,
            pageSize,
            totalPages,
            startPage,
            endPage,
            startIndex,
            endIndex,
            pages
        };
    }

    isEmpty(text: string): boolean {
        if (text == null || text == undefined || text == "") {
            return true;
        } return false;
    }

    isEmptyObj(data: any): boolean {
        if (data == null || data == undefined || data.length == 0 || Object.keys(data).length == 0) {
            return true;
        } return false;
    }
}

export interface Pager {
    totalItems: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
    startPage: number;
    endPage: number;
    startIndex: number;
    endIndex: number;
    pages: number[];
}