declare const root: {
    val: string;
    left: {
        val: string;
        left: {
            val: string;
        };
        right: {
            val: string;
        };
    };
    right: {
        val: string;
        right: {
            val: string;
        };
    };
};
interface Tree {
    left?: Tree;
    right?: Tree;
    val?: string;
}
declare function preorder(tree: Tree): void;
declare function inorder(tree: Tree): void;
declare function postorder(tree: Tree): void;
declare const nums: number[];
declare function getIndexs(nums: number[], target: number): number[] | undefined;
