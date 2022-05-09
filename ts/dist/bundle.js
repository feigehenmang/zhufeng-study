(function () {
    'use strict';

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
    // console.log('validPalindrome', validPalindrome('abacd'))
    // 
    function isPalindrome(str) {
        for (let i = 0; i < Math.floor(str.length / 2); i++) {
            if (str[i] !== str[str.length - i - 1])
                return false;
        }
        return true;
    }
    function validPalindrome2(str) {
        let i = 0, j = str.length - 1;
        while (i < j) {
            if (str[i] === str[j]) {
                i++;
                j--;
            }
            if (str[i] !== str[j]) {
                if (isPalindrome(++i, j)) {
                    return true;
                }
                if (isPalindrome(i, --j)) {
                    return true;
                }
                return false;
            }
        }
        function isPalindrome(start, end) {
            while (start < end) {
                if (str[start] !== str[end]) {
                    return false;
                }
                else {
                    start++;
                    end--;
                }
            }
            return true;
        }
        return true;
    }
    console.log('isPalindrome', isPalindrome('abcba'));
    console.log('isPalindrome', isPalindrome('abcbaa'));
    console.log('validPalindrome2', validPalindrome2('abcbaa'));

})();
//# sourceMappingURL=bundle.js.map
