import 'jquery';
import 'jqueryui';

declare global {
  interface JQuery {
    datepicker(options?: any): JQuery;
  }
}
