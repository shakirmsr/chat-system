<template>
  <div class="modal fade" tabindex="-1">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Add a user to the chatlist</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ref="Close"></button>
				</div>
				<div class="modal-body">
					<input type="text" class="i-type1" v-model="newUser" placeholder="Enter user name" ref="Input">
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" @click = "addUser">Add User</button>
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {

	data() {
		return {
			newUser: ""
		}
	},

	methods: {
		addUser(){
			if(this.newUser){
				let newUserData = {
					name: this.newUser,
					avatar: "https://www.pngjoy.com/pngl/136/2750635_gray-circle-login-user-icon-png-transparent-png.png",
					counter: 0,
					messages: []
				}
				this.emitter.emit('addNewUser', newUserData);
				this.$refs.Close.click(); //to close the model on submit
				this.newUser = "";
			}
		}
	},

  mounted () {
    const modal = new bootstrap.Modal(this.$el)
    modal.toggle();
		
		this.$el.addEventListener('hidden.bs.modal', () => {
			this.$emit('close');
		});
		this.$el.addEventListener('shown.bs.modal', () => {
			this.$refs.Input.focus();
		})
  },
}
</script>
