import { Client } from "@notionhq/client";

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

export const getNotionValue = (property: any) => {
    if (!property) return null;
    switch (property.type) {
        case "title":
            return property.title.map((t: any) => t.plain_text).join("");
        case "rich_text":
            return property.rich_text.map((t: any) => t.plain_text).join("");
        case "number":
            return property.number;
        case "select":
            return property.select ? property.select.name : null;
        case "multi_select":
            return property.multi_select.map((s: any) => s.name);
        case "date":
            return property.date ? property.date.start : null;
        case "checkbox":
            return property.checkbox;
        case "url":
            return property.url;
        case "email":
            return property.email;
        case "phone_number":
            return property.phone_number;
        case "files":
            return property.files.map((f: any) => ({
                url: f.type === "external" ? f.external.url : f.file.url,
                name: f.name,
            }));
        case "relation":
            // Not fully resolved in base API
            return property.relation.map((r: any) => r.id);
        default:
            return null;
    }
};

export const fetchDatabase = async (databaseId: string) => {

    let results: any[] = [];
    let cursor: string | undefined = undefined;

    try {
        do {
            const res: any = await notion.databases.query({
                database_id: databaseId,
                start_cursor: cursor,
                page_size: 100,
            });
            results = [...results, ...res.results];
            cursor = res.next_cursor || undefined;
        } while (cursor);
    } catch (error: any) {
        console.error(`Failed to fetch database ${databaseId}:`, error.message);
        return [];
    }

    return results.map((page: any) => {
        const row: any = { id: page.id };
        for (const key of Object.keys(page.properties)) {
            row[key] = getNotionValue(page.properties[key]);
        }
        // Set a fallback for title if it's named something else
        if (!row.title && page.properties.Name?.type === 'title') {
            row.title = getNotionValue(page.properties.Name);
        }
        if (!row.title && page.properties.Page?.type === 'title') {
            row.title = getNotionValue(page.properties.Page);
        }
        return row;
    });
};

export default notion;
