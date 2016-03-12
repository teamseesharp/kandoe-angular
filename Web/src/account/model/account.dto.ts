export class AccountDTO {

    public id: number;
    public email: string;
    public name: string;
    public surname: string;
    public picture: string;
    public secret: string;
    public chatMessages: Array<string>;
    public organisations: Array<string>;
    public organisedSessions: Array<string>;
    public participatingSessions: Array<string>;
    public subthemes: Array<string>;
    public themes: Array<string>;
}

/*{
    "Id":3, "Email":"cas.decelle@gmail.com", "Name":"Cas", "Picture":"picture", "Secret":"auth0|56d49e6d6568e621399e379c"
        , "Surname":"Decelle", "ChatMessages":[], "Organisations":[], "OrganisedSessions":[], "ParticipatingSessions"
:[], "Subthemes":[], "Themes":[]
}*/