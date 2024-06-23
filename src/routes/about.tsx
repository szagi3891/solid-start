import { Title } from "@solidjs/meta";
import { createAsync } from "@solidjs/router";
import Counter from "~/components/Counter";
import { api } from "~/lib/api";

export default function Home() {
    const hello = createAsync(() => api.example.hello.query("world"));
    return (
        <main>
            <Title>About</Title>
            <h1>About</h1>
            <p>
                To jest strona about ...
            </p>
            <Counter />
            <pre>
                <code>{JSON.stringify(hello(), null, 2)}</code>
            </pre>
        </main>
    );
}
