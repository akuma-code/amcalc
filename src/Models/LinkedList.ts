import { Enum_NodesAction } from "../ActionComponents/ActionTypes/Types";
import { _log } from "../Helpers/HelpersFns";
import { ANYfn } from "../Interfaces/MathActionsTypes";

class DataNode<T> {
    public next: DataNode<T> | null = null;
    public prev: DataNode<T> | null = null;
    constructor(public data: T) { }
}

export interface ListDataNode {
    fn: ANYfn
    type: Enum_NodesAction
}
export class DTO_Node<FN extends ANYfn> implements ListDataNode {
    public fn: FN
    public type: Enum_NodesAction

    constructor(
        func: FN,
        type: Enum_NodesAction
    ) {
        this.fn = func
        this.type = type
    }

    exec(args: unknown) {
        try {
            const out = this.fn(args)
            return out
        } catch (error) {
            _log("Something gone wrong, check arguments!")
            return
        }
    }


}
interface ILinkedList<T> {
    insertInBegin(data: T): DataNode<T>;
    insertAtEnd(data: T): DataNode<T>;
    deleteNode(node: DataNode<T>): void;
    traverse(): T[];
    size(): number;
    search(comparator: (data: T) => boolean): DataNode<T> | null;
}
class LinkedList<T> implements ILinkedList<T> {
    public head: DataNode<T> | null = null;

    public insertAtEnd(data: T): DataNode<T> {
        const node = new DataNode(data);
        if (!this.head) {
            this.head = node;
        } else {
            const getLast = (node: DataNode<T>): DataNode<T> => {
                return node.next ? getLast(node.next) : node;
            };

            const lastNode = getLast(this.head);
            node.prev = lastNode;
            lastNode.next = node;
            this.head = node
        }
        return node;
    }

    public insertInBegin(data: T): DataNode<T> {
        const node = new DataNode(data);
        if (!this.head) {
            this.head = node;
        } else {
            this.head.prev = node;
            node.next = this.head;
            this.head = node;
        }
        return node;
    }

    public deleteNode(node: DataNode<T>): void {
        if (!node.prev) {
            this.head = node.next;
        } else {
            const prevNode = node.prev;
            prevNode.next = node.next;
        }
    }

    public search(comparator: (data: T) => boolean): DataNode<T> | null {
        const checkNext = (node: DataNode<T>): DataNode<T> | null => {
            if (comparator(node.data)) {
                return node;
            }
            return node.next ? checkNext(node.next) : null;
        };

        return this.head ? checkNext(this.head) : null;
    }

    public traverse(): T[] {
        const array: T[] = [];
        if (!this.head) {
            return array;
        }

        const addToArray = (node: DataNode<T>): T[] => {
            array.push(node.data);
            return node.next ? addToArray(node.next) : array;
        };
        return addToArray(this.head);
    }

    public size(): number {
        return this.traverse().length;
    }
}

class FnLinkedList<Data extends DTO_Node<ANYfn>> extends LinkedList<Data>{
    head: DataNode<Data> | null = null;
    fnSearch(comparator: (data: Data) => boolean) {
        const checkNext = (node: DataNode<Data>): Data['fn'] | null => {
            if (comparator(node.data)) {
                return node.data.fn;
            }
            return node.next ? checkNext(node.next) : null;
        };

        return this.head ? checkNext(this.head) : null;
    }

    public add(data: Data): DataNode<Data> {
        const node = new DataNode(data);
        if (!this.head) {
            this.head = node;
        } else {
            this.head.prev = node;
            node.next = this.head;
            this.head = node;
        }
        return node;
    }
}


export default FnLinkedList