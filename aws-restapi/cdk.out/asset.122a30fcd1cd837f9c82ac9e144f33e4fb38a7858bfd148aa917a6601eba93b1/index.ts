exports.handler = async (event: any = {}): Promise<any> => {
    if (!event.body) {
        return {
            statusCode: 400,
            body: "invalid request, you are missing the parameter body",
        };
    }

    console.log(event)
    // switch(event.info.fieldName) {
    //     case "createTodo":
    //         return await createTodo(event.arguments.todosInput);

    //     case "deleteTodo":
    //         return await deleteTodo(event.arguments.thatId);

    //     case "updateTodo":
    //         return await updateTodo(event.arguments.todosInput);

    //     case "allTodos":
    //         return await allTodos();

    //     default:
    //         return null;
    // }
}