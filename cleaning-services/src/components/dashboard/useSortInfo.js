import { useState } from 'react';

function useSortableData(data) {
    const [toggle, setToggle] = useState(true);

    const sortInfo = (aa) => {
        return data.slice().sort((a, b) => {
            if (typeof a[aa] === 'string' && typeof b[aa] === 'string') {
                const aaa = a[aa];
                const bbb = b[aa];
                return toggle ? aaa.localeCompare(bbb) : bbb.localeCompare(aaa);
            } else {
                return toggle ? a[aa] - b[aa] : b[aa] - a[aa];
            }
        });
    };

    const handleSort = (aa) => {
        setToggle(!toggle);
        return sortInfo(aa);
    };

    return { sortedData: sortInfo, handleSort };
}
export default useSortableData