<template>
    <q-item clickable tag="a" target="_blank" :href="link">
        <q-item-section v-if="icon" avatar>
            <q-icon v-if="icon === 'bitbucket'">
                <i style="padding: 0" class="fab fa-bitbucket" />
            </q-icon>
            <q-icon v-else-if="icon === 'github'">
                <i style="padding: 0" class="fab fa-github" />
            </q-icon>
            <q-icon v-else :name="icon" />
        </q-item-section>

        <q-item-section style="padding: 0">
            <q-item-label>{{ title }}</q-item-label>
            <div style="padding: 0; font-size: 10px; color: gray">
                {{ caption }}
            </div>
        </q-item-section>
    </q-item>
</template>

<script>
export default {
    name: 'EssentialLink',
    props: {
        title: {
            type: String,
            required: true
        },

        caption: {
            type: String,
            default: ''
        },

        link: {
            type: String,
            default: '#'
        },

        icon: {
            type: String,
            default: ''
        }
    }
};
</script>
