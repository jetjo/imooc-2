import { YCookie } from "../cookie-helper";
// import { useDicts } from "@/composables/use-dicts";
import { somethingAwaiter } from "../../待改进/some-thing-awaitor";
import { insertSortedStringArray, getIndexAtSortedStringArray } from '../../字符串数组排序';

// const { dicts: dateRangeList } = useDicts('sys_date_range_type');

const dateRangeList = [
    {
        "label": "day",
        "value": "0"
    },
    {
        "label": "week",
        "value": "1"
    },
    {
        "label": "month",
        "value": "2"
    },
    {
        "label": "year",
        "value": "3"
    },
    {
        "label": "custom",
        "value": "4"
    }
];

const apiNames = [
    "入营车辆园区对比",
    "电子围栏事件分布",
    "电子围栏事件趋势(近7天)",
    "考勤异常人员部门分布",
    "考勤异常人数",
    "视频事件趋势(近7天)",
    "视频监控事件分布",
    "设备分布",
    "设备在线状态(当日)",
    "访客入营趋势(近7天)",
    "访客车辆部门分布"
];

// //names必须是排好序的，第一次可以不调用这个函数，正确运行一遍后打印出结果，以后用结果数组来调用
// export function setApiName(names)
// {
//     apiNames = names;
//     console.log('range type', names);
// }

const NAME = 'dateRangType';

export async function getDateRangType(name)
{
    // debugger;
    await somethingAwaiter(
        0,
        () => dateRangeList && dateRangeList.length,
        () => true,
        1000,
        "等待日期范围类型加载"
    );

    try
    {
        const value = YCookie.get(NAME);
        const curIndex = getIndexAtSortedStringArray(apiNames, name);
        const index = curIndex === -1 ? insertSortedStringArray(apiNames, name) : curIndex;
        if (curIndex === -1)
        {
            console.warn('range type get', name, index);
        }
        // if (curIndex === -1)
        // {
        //     const key = encodeURIComponent(`${ NAME }:${ location.pathname }`);
        //     // const count = parseInt(localStorage.getItem(key)) || 0;
        //     localStorage.setItem(key, apiNames.length - 3)
        //     console.log('range type get', decodeURIComponent(key), apiNames.length - 3);
        // }
        if (value)
        {
            const v = parseInt(value.split(',')[index]);
            if (!isNaN(v))
            {
                console.log('range type get', name, index, v);
                return v;
            }
        }
        const cv = dateRangeList[0].value;
        _setCookieValue(cv, value, index);

        console.log('range type get', name, index, cv);
        return parseInt(cv);
    } catch (error)
    {
        console.log('range type get', name, 'unknow', 'unknow', error);
    }
}

function _setCookieValue(value, curCookieValue, index)
{
    let expires = new Date();
    expires = new Date(expires.getFullYear() + 3, 0, 1, 0, 0, 0, 0);

    const vs = (curCookieValue?.split(',')) || [];
    vs[index] = value;
    if (index - (vs.length - 1) > 1)
    {
        vs.fill('', vs.length, index);
    }
    vs[index] = value;
    YCookie.set(NAME, vs.join(), {
        // maxAge: 365 * 24 * 60 * 60,
        expires,
        secure: true,
    });

}

export function setDateRangType(name, value)
{
    if (value == 4) value = 3;
    try
    {
        // debugger;
        const curCookieValue = YCookie.get(NAME);
        const curIndex = getIndexAtSortedStringArray(apiNames, name);
        const index = curIndex === -1 ? insertSortedStringArray(apiNames, name) : curIndex;
        _setCookieValue(value, curCookieValue, index);
        // if (curIndex === -1)
        // {
        //     const key = encodeURIComponent(`${ NAME }:${ location.pathname }`);
        //     // const count = parseInt(localStorage.getItem(key)) || 0;
        //     localStorage.setItem(key, apiNames.length - 3)
        //     console.log('range type set', decodeURIComponent(key), apiNames.length - 3);
        // }
        console.log('range type set', name, index, value, apiNames);
    } catch (error)
    {
        console.log('range type set', name, 'unknow', value, error);
    }
};
