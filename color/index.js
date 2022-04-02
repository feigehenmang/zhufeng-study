const rgbTo16 = rgb => {
    const rgbRegexp = /^(rgb|RGB)/
    if(rgbRegexp.test(rgb)) {
        const splitRgb = /(\(*\))/
        console.log(splitRgb.exec(rgb))
    }
}


console.log(rgbTo16('rgb(255,255,255)'))