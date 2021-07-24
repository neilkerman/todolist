export default class TodoModel {
    id;
    title;
    body;
    reminder;
    comments;
    createdAt;
    completedAt;

    constructor({ id, title, body, reminder = "", comments = "" }) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.reminder = reminder;
        this.comments = comments;
        this.createdAt = Date.now();
    }

    update({ title, body, reminder, comments, completedAt }) {
        if (title) {
            this.title = title;
        }
        if (body) {
            this.body = body;
        }
        if (reminder) {
            this.reminder = reminder;
        }
        if (comments) {
            this.comments = comments;
        }
        if (completedAt) {
            this.completedAt = completedAt;
        }
    }
}