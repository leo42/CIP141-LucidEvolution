import { EventEmitter as NodeEventEmitter } from 'events';

declare global {
    var EventEmitter: typeof NodeEventEmitter;
}

globalThis.EventEmitter = NodeEventEmitter; 