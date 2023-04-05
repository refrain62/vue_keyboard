
// オシレーター
class VOscillator {
    constructor() {
        this.ctx = new AudioContext();
        this.osc;
    }

    /**
     * 音を鳴らす
     */
    sound( note ) {
        this.osc = this.ctx.createOscillator();
        this.osc.frequency.value = note;
        this.osc.connect( this.ctx.destination );
        this.osc.start();
    }

    /**
     * 音を止める
     */
    stop() {
        this.osc.stop();
    }
}

// Vue.jsのアプリ起動
new Vue({
    el: "#app",
    data: {
        KEY_A:  440,        // 基音：440Hz
        KEY_CNT: 88,        // 鍵盤数
        osc: null,          // オシレーター
    },
    created: function() {
        // インスタンス生成
        this.osc = new VOscillator();
    },
    mounted: function() {
        // 基音付近にスクロール
        const keyList = document.querySelector('.key-list');
        keyList.scrollLeft = (keyList.scrollWidth / 2) - (keyList.offsetWidth / 2);
    },
    methods: {
        // 黒鍵かどうか
        isSharp: function(i) {
            // A# C# D# F# G#
            return [1, 4, 6, 9, 11].includes( i % 12 );
        },
        // 鍵盤を押したとき
        stroke: function( note ) {
            this.osc.sound( note );
        },
        // 鍵盤を押すのをやめたとき
        release: function() {
            this.osc.stop();
        }
    },
    computed: {
        // 鍵盤
        notes: function() {
            // 88鍵 -48は基音A4→A0までの距離
            return [...Array(this.KEY_CNT)].map((_, i) => this.KEY_A * Math.pow(2, (1 / 12) * (-48 + i)));
        }
    }
});


