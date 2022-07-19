import {createStore} from 'vuex'

const store = createStore({
    state: {
        array: localStorage.getItem('array')?.split(',') || [],
        initialFloor: Number(localStorage.getItem('initialFloor')) || 1,
        activeButtons: localStorage.getItem('activeButtons')?.split(',') || []
    },
    mutations: {
        pushArray(state, element) {
            if (this.state.array[0] === '') {
                this.state.array.shift();
            }
            this.state.array.push(element);
            localStorage.setItem('array', this.state.array);
        },
        shiftArray() {
            if (this.state.array[0] === '') {
                this.state.array.shift();
            }
            const deleted = this.state.array.shift();
            localStorage.setItem('array', this.state.array);
            return deleted;
        },
        setFloor(state, floor) {
            this.state.initialFloor = floor;
            localStorage.setItem('initialFloor', this.state.initialFloor);
        },
        pushActiveButton(state, element){
            if (this.state.activeButtons[0] === '') {
                this.state.activeButtons.shift();
            }
            this.state.activeButtons.push(element)
            localStorage.setItem('activeButtons', this.state.activeButtons);
        },
        deleteActiveButton(){
            if (this.state.activeButtons[0] === '') {
                this.state.activeButtons.shift();
            }
            this.state.activeButtons.shift();
            localStorage.setItem('activeButtons', this.state.activeButtons);
        }
    }
})
export default store;