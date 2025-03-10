import 'Frontend/demo/init'; // hidden-full-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-full-source-line (Grid's connector)

import { html, LitElement, render } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/vaadin-grid/vaadin-grid';
import type { GridItemModel } from '@vaadin/vaadin-grid/vaadin-grid';
import { getPeople } from 'Frontend/demo/domain/DataService';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

// tag::snippet[]
@customElement('grid-wrap-cell-content')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private items: Person[] = [];

  async firstUpdated() {
    const { people } = await getPeople();
    this.items = people;
  }

  render() {
    return html`
      <vaadin-grid .items="${this.items}" theme="wrap-cell-content">
        <vaadin-grid-column
          header="Image"
          .renderer="${this.avatarRenderer}"
          flex-grow="0"
          auto-width
        ></vaadin-grid-column>
        <vaadin-grid-column path="firstName"></vaadin-grid-column>
        <vaadin-grid-column path="lastName"></vaadin-grid-column>
        <vaadin-grid-column
          header="Address"
          .renderer="${this.addressRenderer}"
        ></vaadin-grid-column>
      </vaadin-grid>
    `;
  }

  private avatarRenderer = (root: HTMLElement, _: HTMLElement, model: GridItemModel<Person>) => {
    render(
      html`
        <img style="height: var(--lumo-size-m)" src="${model.item.pictureUrl}" alt="User avatar" />
      `,
      root
    );
  };

  private addressRenderer = (root: HTMLElement, _: HTMLElement, model: GridItemModel<Person>) => {
    const item = model.item;
    render(
      html`
        <span
          >${item.address.street} ${item.address.city} ${item.address.zip}
          ${item.address.state}</span
        >
      `,
      root
    );
  };
}
// end::snippet[]
