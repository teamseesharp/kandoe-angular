import {Pipe, PipeTransform} from 'angular2/core';
import {Account} from '../account/model/account';

@Pipe({ name: 'sessionParticipantsPipe' })

export class SessionParticipantsPipe implements PipeTransform {

    transform(value: Array<Account>, args: string[]): string {
        if (value != null) return value.length.toString();
        return "0";
    }
}