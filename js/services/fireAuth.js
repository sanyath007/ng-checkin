app.factory('fireAuthService', function($firebaseAuth) {
	var auth = $firebaseAuth();
	var login = () => {
		auth.$signInWithPopup('google');
	};

	var logout = () => {
		auth.$signOut();
	};

	var user = {};

	auth.$onAuthStateChanged((authData) => {
		angular.copy(authData, user)
	});

	return {
		login: login,
		logout: logout,
		user: user
	};
});