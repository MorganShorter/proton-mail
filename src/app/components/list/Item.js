import React from 'react';
import PropTypes from 'prop-types';
import { Icon, classnames } from 'react-components';
import { getInitial } from 'proton-shared/lib/helpers/string';
import { VIEW_MODE, MAILBOX_LABEL_IDS } from 'proton-shared/lib/constants';

import ItemCheckbox from './ItemCheckbox';
import ItemStar from './ItemStar';
import { getSenders, getRecipients } from '../../helpers/conversation';
import { getSender, getRecipients as getMessageRecipients } from '../../helpers/message';
import { ELEMENT_TYPES } from '../../constants';

const { SENT, SENT_ALL, DRAFTS, DRAFTS_ALL } = MAILBOX_LABEL_IDS;

const Item = ({ labelID, element, elementID, mailSettings = {}, checked = false, onCheck }) => {
    const { ID, Subject, Time } = element;
    const displayRecipients = [SENT, SENT_ALL, DRAFTS, DRAFTS_ALL].includes(labelID);
    const { ViewMode = VIEW_MODE.GROUP } = mailSettings;
    const isGroup = ViewMode === VIEW_MODE.GROUP;
    const senders = isGroup ? getSenders(element) : [getSender(element)];
    const recipients = isGroup ? getRecipients(element) : getMessageRecipients(element);
    const hasAttachment = isGroup ? element.NumAttachments : element.HasAttachment;

    return (
        <div className={classnames(['item-container bg-global-white', elementID === ID && 'item-is-selected'])}>
            <ItemCheckbox checked={checked} onChange={({ target }) => onCheck(target.checked)}>
                {getInitial(displayRecipients ? recipients[0] : senders[0])}
            </ItemCheckbox>
            <div className="flex-item-fluid flex flex-nowrap flex-column flex-spacebetween item-titlesender">
                <div className="flex">
                    <div className="flex-item-fluid w0 pr1">
                        <span className="inbl mw100 ellipsis">{Subject}</span>
                    </div>
                    <div className="item-date flex-item-noshrink">{Time}</div>
                </div>
                <div className="flex">
                    <div className="flex-item-fluid pr1">
                        <span className="inbl mw100 ellipsis">
                            {(displayRecipients ? recipients : senders).join(', ')}
                        </span>
                    </div>
                    <div className="item-icons">
                        {hasAttachment ? <Icon name="attach" /> : null}
                        <ItemStar
                            element={element}
                            type={isGroup ? ELEMENT_TYPES.CONVERSATION : ELEMENT_TYPES.MESSAGE}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

Item.propTypes = {
    labelID: PropTypes.string.isRequired,
    elementID: PropTypes.string,
    mailSettings: PropTypes.object.isRequired,
    element: PropTypes.object.isRequired,
    checked: PropTypes.bool,
    onCheck: PropTypes.func.isRequired
};

export default Item;