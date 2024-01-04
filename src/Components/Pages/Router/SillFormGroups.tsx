import { observer } from "mobx-react-lite"
import { useStoresContext } from "../../../Hooks/useStoresContext"
import SillStoreCard from "../../UI/SillStoreCard"

type Props = {}


const SillFormGroups = observer((props: Props) => {
    const { SillStore } = useStoresContext()
    return (
        <div className='m-1'>
            <SillStoreCard data={SillStore} />

        </div>
    )
})
SillFormGroups.displayName = '*** Savedgroup'
export default SillFormGroups