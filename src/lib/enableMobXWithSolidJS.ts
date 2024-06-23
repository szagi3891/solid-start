
import { Reaction } from "mobx";
import { enableExternalSource } from "solid-js";

export const enableMobXWithSolidJS = () => {

    console.info('enableMobXWithSolidJS');

    let id = 0;
    enableExternalSource((fn, trigger) => {
      console.info('enableExternalSource');

      const reaction = new Reaction(`externalSource@${++id}`, trigger);
      return {
        track: (x) => {
          console.info('track', x);
          let next;
          reaction.track(() => (next = fn(x)));
          return next;
        },
        dispose: () => {
          reaction.dispose();
        },
      };
    });
  };
  