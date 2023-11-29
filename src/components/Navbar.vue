<template>
    <div class="navbar">
        <div class="navbar-end">
            <div class="buttons">
                <!-- We're using an anchor tag and the default behavior is to refresh the whole page on the href. -->
                <!--<a href="/posts/new" class="button">New Post</a>-->
                <RouterLink to="/posts/new" class="button">New Post</RouterLink>  
            </div>
        </div>
    </div>

    <Teleport to="#modal"><!-- rmb # -->
        content to be rendered
    </Teleport>
</template>    