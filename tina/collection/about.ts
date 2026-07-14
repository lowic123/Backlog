import type { Collection } from 'tinacms'

const AboutPage: Collection = {
    name: "aboutPage",
    label : "About page",
    path: "content/pages",
    format: "mdx",
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
            name: "aboutUsText",
            label: "About Us Text",
        },
    ]
}
export default AboutPage;