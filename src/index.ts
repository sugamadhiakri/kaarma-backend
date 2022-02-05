import "reflect-metadata";
import server from "./server";

server.listen(4000).then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
