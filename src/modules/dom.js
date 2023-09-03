const DomModule = (() => {
    function createItem(text) {
        console.log(text)
    }

    return {createItem}
})();

export default DomModule;