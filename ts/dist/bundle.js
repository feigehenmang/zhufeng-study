(function () {
    'use strict';

    function fibLoop(n) {
        let f0 = 0, f1 = 1, cur = 0;
        for (let i = 0; i < n; i++) {
            cur = f0 + f1;
            f0 = f1;
            f1 = cur;
        }
        return cur;
    }
    // console.log(fib(5))

    // console.log(getIndexs(nums, 9))
    // console.log(getIndexsByMap(nums, 9))
    // 给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。
    // nums1 = [1,2,3,0,0,0], m = 3
    // nums2 = [2,5,6], n = 3
    // 输出: [1,2,2,3,5,6]
    function merge(nums1, m, nums2, n) {
        let i = m - 1, j = n - 1, z = m + n - 1;
        while (i >= 0 && j >= 0) {
            if (nums1[i] > nums2[j]) {
                nums1[z] = nums1[i];
                z--;
                i--;
            }
            else {
                nums1[z] = nums2[j];
                z--;
                j--;
            }
        }
        while (j >= 0) {
            nums1[z] = nums2[j];
            z--;
            j--;
        }
        // console.log(i, j, nums1)
        return nums1;
    }
    merge([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3);
    function threeSum(nums) {
        let result = [];
        nums.sort((a, b) => a - b);
        let len = nums.length;
        for (let i = 0; i < len; i++) {
            let j = i + 1;
            let k = len - 1;
            if (i > 0 && nums[i] === nums[i - 1]) {
                continue;
            }
            while (j < k) {
                let r = nums[i] + nums[j] + nums[k];
                if (r > 0) {
                    k--;
                    while (j < k && nums[k] === nums[k - 1]) {
                        k--;
                    }
                }
                else if (r < 0) {
                    j++;
                    while (j < k && nums[j] === nums[j + 1]) {
                        j++;
                    }
                }
                else {
                    result.push([nums[i], nums[j], nums[k]]);
                    k--;
                    j++;
                    while (j < k && nums[k] === nums[k - 1]) {
                        k--;
                    }
                    while (j < k && nums[j] === nums[j + 1]) {
                        j++;
                    }
                }
            }
        }
        return result;
    }
    console.log(threeSum([-1, 0, 1, 2, -1, -4]));
    function validPalindrome(str) {
        let i = 0, j = str.length - 1;
        while (i < j) {
            if (str[i] === str[j]) {
                i++;
                j--;
            }
            if (str[i] !== str[j]) {
                if (isPalindrome(i + 1, j)) {
                    return true;
                }
                if (isPalindrome(i, j - 1)) {
                    return true;
                }
                return false;
            }
        }
        function isPalindrome(ss, se) {
            while (ss < se) {
                if (str[ss] === str[se]) {
                    ss++;
                    se--;
                }
                if (str[ss] !== str[se]) {
                    return false;
                }
            }
            return true;
        }
    }
    console.log('validPalindrome', validPalindrome('abacd'));

    // sort
    let arr = [1, 3, 4, 2, 1, 3, 45, 5, 6];
    console.log(arr.sort((a, b) => a - b)); // 升序 [1, 1, 2, 3, 3, 4, 5, 6, 45]
    console.log(arr.sort((a, b) => b - a)); // 降序 [45, 6, 5, 4, 3, 3, 2, 1, 1]

    // debugger;
    // console.log(ArrayDeepFlat([1, 2, 3, [2, 3, [2, 2]], [1, 2]]))
    // console.log(mergeArr([[1, 2, 4], [2, 3, 7], [3, 5, 7], [4, 5, 8]]))
    // 1、1、2、3、5、8、13、21、34
    // let d = Date.now()
    // console.log((d = Date.now()))
    console.log(fibLoop(30));

})();
//# sourceMappingURL=bundle.js.map
