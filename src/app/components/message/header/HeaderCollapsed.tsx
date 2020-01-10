import React, { MouseEvent } from 'react';
import { c } from 'ttag';

import ItemStar from '../../list/ItemStar';
import ItemDate from '../../list/ItemDate';
import { ELEMENT_TYPES } from '../../../constants';
import MessageLock from '../MessageLock';
import { isSent } from '../../../helpers/message/messages';
import ItemLabels from '../../list/ItemLabels';
import ItemAttachmentIcon from '../../list/ItemAttachmentIcon';
import { MessageExtended } from '../../../models/message';
import { Label } from '../../../models/label';

interface Props {
    message: MessageExtended;
    labels: Label[];
    onExpand: () => void;
}

const HeaderCollapsed = ({ message, labels, onExpand }: Props) => {
    const { Name, Address } = (message.data || {}).Sender || {};

    const handleClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (target.classList.contains('item-star') || target.closest('.item-star')) {
            event.stopPropagation();
            return;
        }

        onExpand();
    };

    const inOutClass = isSent(message.data) ? 'is-outbound' : 'is-inbound';

    return (
        <div
            className={`message-header message-header-collapsed flex flex-nowrap flex-items-center flex-spacebetween cursor-pointer ${inOutClass}`}
            onClick={handleClick}
        >
            <div>
                <span className="mr0-5">{c('Label').t`From:`}</span>
                <span className="bold mr0-5" title={Name}>
                    {Name}
                </span>
                <i title={Address}>&lt;{Address}&gt;</i>
                <MessageLock message={message} />
            </div>
            <div>
                <ItemAttachmentIcon element={message.data} type={ELEMENT_TYPES.MESSAGE} />
                <ItemLabels element={message.data || {}} labels={labels} type={ELEMENT_TYPES.MESSAGE} className="mr1" />
                <ItemDate className="mr1" element={message.data || {}} mode="distance" />
                <ItemStar element={message.data} type={ELEMENT_TYPES.MESSAGE} />
            </div>
        </div>
    );
};

export default HeaderCollapsed;
