import { useState, type MouseEvent, type ReactNode } from 'react';
import { Dialog } from 'radix-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faExpand } from '@fortawesome/free-solid-svg-icons';

import styles from './media.module.css';

interface MediaProps {
  /** Optional caption shown under the media, inline and in the dialog. */
  caption?: string;
  children: ReactNode;
  noBorder?: boolean;
  trigger?: ReactNode;
}

export function Media({ caption, children, noBorder = false, trigger }: MediaProps) {
  const [open, setOpen] = useState(false);
  const triggerClasses = noBorder ? `${styles.imageTrigger} ${styles.imageTriggerBorderless}` : styles.imageTrigger;

  // Now that .content fills the whole screen, Radix's own "click outside Content"
  // auto-close has nowhere to fire from — everything is inside Content. Close only
  // when the click lands on the background itself (not the media or the caption),
  // so the caption stays selectable/clickable without dismissing the viewer.
  function closeIfBackground(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      setOpen(false);
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      {trigger ? (
        <Dialog.Trigger asChild>
          { trigger }
        </Dialog.Trigger>
      ) :
      (
        <figure className={styles.figure}>
          <Dialog.Trigger asChild>
              <button type="button" className={triggerClasses} aria-label={`View full-screen`}>
                <div className={styles.thumbnail}>
                  { children }
                </div>
                <span className={styles.expandHint} aria-hidden="true">
                  <FontAwesomeIcon icon={faExpand} />
                </span>
              </button>
            </Dialog.Trigger>
          {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
        </figure>
      )} 

      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.dialog}>
          <Dialog.Title className="sr-only">{caption ?? 'Media viewer'}</Dialog.Title>
          <div className={styles.content} onClick={closeIfBackground}>
            {/* Reserved header row — the media area below can never grow into this space,
                so the button can't end up sitting on top of a large image. */}
            <div className={styles.closeRow} onClick={closeIfBackground}>
              <Dialog.Close asChild>
                <button type="button" className={styles.closeButton} aria-label="Close">
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </Dialog.Close>
            </div>
            <div className={styles.mediaArea} onClick={closeIfBackground}>
              <div className={styles.fullMedia} onClick={closeIfBackground}>
                { children }
              </div>
              { !!caption && (
                <Dialog.Description className={styles.description}>
                  {caption}
                </Dialog.Description>
              )}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
