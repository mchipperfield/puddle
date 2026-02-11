<script lang="ts">
    import { auth } from "$lib/firebase";
    import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

    async function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Authentication error:", error);
            alert((error as Error).message);
        }
    }
</script>

<div class="login-container">
    <h2>Login</h2>
    <button on:click={signInWithGoogle}>
        Sign in with Google
    </button>
</div>

<style>
    .login-container {
        max-width: 320px;
        margin: 50px auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
        text-align: center;
    }
    button {
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
    }
</style>