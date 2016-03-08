import {Pipe, PipeTransform} from 'angular2/core';
import {SessionType} from './model/session';

@Pipe({ name: 'sessionTypePipe' })

export class SessionTypePipe implements PipeTransform {

    transform(value: SessionType, args: string[]): string {
        //return value == SessionType.sync ? 'sync' : 'async';
        return SessionType[value];
    }
}