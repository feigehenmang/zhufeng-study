import { FixedSizeList } from '../react-window'
import './ReactWindow.css'
const Row = ({ index, style }) => (
    <div className={index % 2 ? 'ListItemOdd' : 'ListItemEven'} style={style}>Row{index}</div>
)
export function ReactWindow() {
    return (
        <FixedSizeList
          className='List'
          height={200}
          width={200}
          itemSize={50}
          itemCount={1000}
        >
            {Row}
        </FixedSizeList>
    )
}