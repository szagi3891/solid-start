import { Resource } from "@reactive/utils";
import { Value } from "@reactive/utils";
import { Title } from "@solidjs/meta";
import { Show, createMemo } from "solid-js";
import { api } from "~/lib/api";


class CounterValue {

    public show: Value<boolean>;
    public readonly counter: Value<number>;

    public readonly api: Resource<string>;

    constructor() {
        this.show = new Value(true);

        this.counter = new Value(0, (setValue) => {
            console.info('start ...');
    
            const timer = setInterval(() => {
                setValue(this.counter.getValue() + 1);
            }, 1000);

            return () => {
                console.info('end ...');
                clearInterval(timer);
            };
        });

        this.api = new Resource(async () => {
            const response = await api.example.hello.query('rrrr');
            return response;
        })
    }

    toggle = () => {
        this.show.setValue(!this.show.getValue());
    }

    get apiResponse(): string {
        return this.api.getReady() ?? '--- loading ---';
    }
}

const state = new CounterValue();


export default function Home() {
    // const hello = createAsync(() => api.example.hello.query("world"));

    const label = createMemo(() => {
        return state.show.getValue() ? 'Hide' : 'Show';
    });

    return (
        <main>
            <Title>Hello World</Title>
            <h1>Hello world!</h1>

            <div onClick={state.toggle}>
                { label() }
            </div>

            <Show when={state.show.getValue()}>
                State = {state.counter.getValue()}
            </Show>

            <div>
                { state.apiResponse }
            </div>
        </main>
    );
}
