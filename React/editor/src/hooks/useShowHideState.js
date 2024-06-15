import { useState } from "react"

const useShowHideState = () => {
    const [show, setShow] = useState(false);
    return {show, setShow}
}

export default useShowHideState;