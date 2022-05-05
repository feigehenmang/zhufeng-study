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
declare function getIndexsByMap(nums: number[], target: number): any[] | undefined;
declare function merge(nums1: number[], m: number, nums2: number[], n: number): number[];
declare function threeSum2(nums: number[]): number[][];
declare function threeSum(nums: number[]): number[][];
declare function validPalindrome(str: string): boolean | undefined;
declare function transformStr(str: string): void;
