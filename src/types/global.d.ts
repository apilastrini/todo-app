interface DedicatedWorkerGlobalScope extends WorkerGlobalScope {
  onmessage: ((this: DedicatedWorkerGlobalScope, ev: MessageEvent) => any) | null;
  postMessage(message: any, transfer?: Transferable[]): void;
  readonly crypto: Crypto;
}

declare var self: DedicatedWorkerGlobalScope;
