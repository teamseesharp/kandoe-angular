import {Injectable}     from 'angular2/core';
import {Observable}     from 'rxjs/Observable';
import {AuthHttp} from 'angular2-jwt';

import {Organisation} from './model/organisation';

@Injectable()
export class OrganisationService {

    constructor(private authHttp: AuthHttp) {

    }

    getOrganisations() {
    }

}
