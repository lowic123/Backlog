import type { Collection } from 'tinacms';

const HomePage: Collection = {
    name: "homePage",
    label: "Home page",
    path: "content/pages",
    format: "json",
    ui: {
        allowedActions: {
            create: false,
            delete: false,
        },
        router: ({document}) =>{
        if(document._sys.filename === "home-page"){
            return "/;"
        }
        return undefined;
        },
    },
    fields : [
        {
            type: "string",
            name: "title",
            label: "Hero title",
            required: true,
        },
        {
            type: "string",
            name: "subtitle",
            label: "Hero subtitle",
        },
        {
            type: "string",
            name: "emptyPrompt",
            label: "Empty search prompt",
        },
        {
            type: "string",
            name: "searchPlaceholder",
            label: "Search input placeholder",
        },
    ]
}

export default HomePage;