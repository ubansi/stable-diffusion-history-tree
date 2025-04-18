import gradio as gr
from modules import script_callbacks

def on_ui_tabs():
    with gr.Blocks(analytics_enabled=False) as history_tree_tab_interface:
        gr.Markdown("## Stable Diffusion History Tree")
        gr.HTML('<link rel="stylesheet" href="file=extensions/stable-diffusion-history-tree/web/vis-network.min.css">') # パスは要確認・調整
        gr.HTML('<div id="history-tree-graph" style="width: 100%; height: 600px; border: 1px solid lightgray;"></div>') # サイズは調整可能

        with gr.Accordion("History Tree Controls", open=True):

            return [(history_tree_tab_interface, "History Tree", "stable_diffusion_history_tree_tab")]

script_callbacks.on_ui_tabs(on_ui_tabs)
