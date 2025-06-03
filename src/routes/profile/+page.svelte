<script>
  import { enhance } from "$app/forms";

</script>
<div class="relative">
  <div>
    Profile Page
  </div>
  <form method='post' action='?/logout' use:enhance>
    <button>Sign out</button>
  </form>
</div>