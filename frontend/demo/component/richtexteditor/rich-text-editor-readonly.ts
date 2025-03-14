import 'Frontend/demo/init'; // hidden-full-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/vaadin-rich-text-editor/vaadin-rich-text-editor';

import templates from '../../../../src/main/resources/data/templates.json';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('rich-text-editor-readonly')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private richText = templates.richTextDelta;

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-rich-text-editor
        style="height: 400px;"
        readonly
        .value="${this.richText}"
      ></vaadin-rich-text-editor>
      <!-- end::snippet[] -->
    `;
  }
}
