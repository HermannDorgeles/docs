import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/flow-frontend/contextMenuConnector.js'; // hidden-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/vaadin-context-menu/vaadin-context-menu';
import '@vaadin/vaadin-grid/vaadin-grid';
import type { GridElement, GridEventContext } from '@vaadin/vaadin-grid/vaadin-grid';
import { getPeople } from 'Frontend/demo/domain/DataService';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('context-menu-basic')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  // tag::snippet[]
  @state()
  private items = [{ text: 'View' }, { text: 'Edit' }, { text: 'Delete' }];
  // end::snippet[]

  @state()
  private gridItems: Person[] = [];

  async firstUpdated() {
    this.gridItems = (await getPeople({ count: 5 })).people;
  }

  render() {
    return html`
      <!-- tag::snippethtml[] -->
      <vaadin-context-menu .items=${this.items}>
        <vaadin-grid
          height-by-rows
          .items=${this.gridItems}
          @vaadin-contextmenu=${this.onContextMenu}
        >
          <vaadin-grid-column path="firstName"></vaadin-grid-column>
          <vaadin-grid-column path="lastName"></vaadin-grid-column>
          <vaadin-grid-column path="email"></vaadin-grid-column>
          <vaadin-grid-column header="Phone number" path="address.phone"></vaadin-grid-column>
        </vaadin-grid>
      </vaadin-context-menu>
      <!-- end::snippethtml[] -->
    `;
  }

  onContextMenu(e: MouseEvent) {
    // Prevent opening context menu on header row.
    const target = e.currentTarget as GridElement;
    if ((target.getEventContext(e) as GridEventContext<Person>).section !== 'body') {
      e.stopPropagation();
    }
  }
}
