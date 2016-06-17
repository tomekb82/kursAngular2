import { Pipe, PipeTransform} from 'angular2/core';

@Pipe({name: 'filter'})
export class FilterPipe implements PipeTransform {

    transform(list: any[], parameters: string[]): any {

		console.log("params");
    	console.log(parameters);
        const [filterByField, filterValue] = parameters;

        if (!filterByField || !filterValue) {
            return list;
        }

        return list.filter(item => {
            const field = item[filterByField].toLowerCase();
            const filter = filterValue.toLocaleLowerCase();
            console.log("field");
            console.log(field);
            console.log("filter");
            console.log(filter);

            return field.indexOf(filter) >= 0;
        });
    }
}