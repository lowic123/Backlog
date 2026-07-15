import type { Collection } from 'tinacms'

const AboutPage: Collection = {
    name: "aboutPage",
    label : "About page",
    path: "content/pages",
    format: "mdx",
    ui: {
        allowedActions: {
        },
        router: ({document}) =>{
        if(document._sys.filename === "about-page"){
            return "/about"
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
            type: "rich-text",
            name: "body",
            label: "About Us Body",
            isBody: true
        },
    ]
}
export default AboutPage;